
import { supabase } from "@/lib/supabase";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { v4 as uuidv4 } from "uuid";

export function useBookmarks() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Function to fetch all bookmarks for the current user
  const fetchBookmarks = async () => {
    if (!user) return [];

    // For demo purposes, we'll use localStorage if Supabase isn't connected
    if (process.env.NODE_ENV === 'development' || !supabase) {
      const storedBookmarks = localStorage.getItem('user_bookmarks');
      if (storedBookmarks) {
        return JSON.parse(storedBookmarks);
      }
      return [];
    }

    try {
      const { data, error } = await supabase
        .from("bookmarks")
        .select("*")
        .eq("user_id", user.id);

      if (error) {
        console.error("Supabase error:", error);
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error("Failed to fetch bookmarks:", error);
      return [];
    }
  };

  // Query to get bookmarks
  const bookmarksQuery = useQuery({
    queryKey: ["bookmarks", user?.id],
    queryFn: fetchBookmarks,
    enabled: !!user,
  });

  // Check if an item is bookmarked
  const isBookmarked = (itemId: string, itemType: "hackathon" | "internship") => {
    if (!bookmarksQuery.data) return false;
    
    return bookmarksQuery.data.some(
      (bookmark: any) => bookmark.item_id === itemId && bookmark.item_type === itemType
    );
  };

  // Mutation to add a bookmark
  const addBookmarkMutation = useMutation({
    mutationFn: async ({
      itemId,
      itemType,
    }: {
      itemId: string;
      itemType: "hackathon" | "internship";
    }) => {
      if (!user) throw new Error("User not authenticated");

      // For demo purposes
      if (process.env.NODE_ENV === 'development' || !supabase) {
        const storedBookmarks = localStorage.getItem('user_bookmarks') || '[]';
        const bookmarks = JSON.parse(storedBookmarks);
        const newBookmark = {
          id: uuidv4(),
          user_id: user.id,
          item_id: itemId,
          item_type: itemType,
          created_at: new Date().toISOString()
        };
        bookmarks.push(newBookmark);
        localStorage.setItem('user_bookmarks', JSON.stringify(bookmarks));
        return newBookmark;
      }

      try {
        const { data, error } = await supabase.from("bookmarks").insert({
          user_id: user.id,
          item_id: itemId,
          item_type: itemType,
        }).select();

        if (error) throw error;
        return data;
      } catch (error) {
        console.error("Failed to add bookmark:", error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookmarks", user?.id] });
      toast({
        title: "Added to bookmarks",
        description: "Item has been added to your bookmarks",
      });
    },
    onError: (error) => {
      console.error("Failed to add bookmark:", error);
      toast({
        title: "Failed to bookmark",
        description: "There was an error adding this item to your bookmarks",
        variant: "destructive",
      });
    },
  });

  // Mutation to remove a bookmark
  const removeBookmarkMutation = useMutation({
    mutationFn: async ({
      itemId,
      itemType,
    }: {
      itemId: string;
      itemType: "hackathon" | "internship";
    }) => {
      if (!user) throw new Error("User not authenticated");

      // For demo purposes
      if (process.env.NODE_ENV === 'development' || !supabase) {
        const storedBookmarks = localStorage.getItem('user_bookmarks') || '[]';
        const bookmarks = JSON.parse(storedBookmarks);
        const filteredBookmarks = bookmarks.filter(
          (b: any) => !(b.item_id === itemId && b.item_type === itemType && b.user_id === user.id)
        );
        localStorage.setItem('user_bookmarks', JSON.stringify(filteredBookmarks));
        return { success: true };
      }

      try {
        const { data, error } = await supabase
          .from("bookmarks")
          .delete()
          .match({ user_id: user.id, item_id: itemId, item_type: itemType });

        if (error) throw error;
        return data;
      } catch (error) {
        console.error("Failed to remove bookmark:", error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookmarks", user?.id] });
      toast({
        title: "Removed from bookmarks",
        description: "Item has been removed from your bookmarks",
      });
    },
    onError: (error) => {
      console.error("Failed to remove bookmark:", error);
      toast({
        title: "Failed to remove bookmark",
        description: "There was an error removing this item from your bookmarks",
        variant: "destructive",
      });
    },
  });

  // Toggle bookmark function
  const toggleBookmark = (itemId: string, itemType: "hackathon" | "internship") => {
    if (isBookmarked(itemId, itemType)) {
      removeBookmarkMutation.mutate({ itemId, itemType });
    } else {
      addBookmarkMutation.mutate({ itemId, itemType });
    }
  };

  return {
    bookmarks: bookmarksQuery.data || [],
    isLoading: bookmarksQuery.isLoading,
    isError: bookmarksQuery.isError,
    isBookmarked,
    toggleBookmark,
    refetch: bookmarksQuery.refetch,
  };
}
