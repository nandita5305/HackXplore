
import { Card, CardContent } from "@/components/ui/card";
import { partnerLogos } from "@/data/mockData";

export function PartnerSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-transparent to-primary/5">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">Our Partners</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We collaborate with industry leaders and top organizations to bring you the best opportunities.
          </p>
        </div>
        
        <Card className="bg-background/50 border border-primary/10 backdrop-blur-md overflow-hidden">
          <CardContent className="p-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 items-center justify-items-center">
              {partnerLogos.map((partner) => (
                <a 
                  key={partner.name}
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-transform hover:scale-105 flex items-center justify-center h-16"
                >
                  <img 
                    src={partner.logo} 
                    alt={partner.name} 
                    className="max-h-full max-w-full object-contain filter brightness-90 hover:brightness-100"
                  />
                </a>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
