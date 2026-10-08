import { Button, Container } from "@/components/ui/primitives";

export default function NotFound() {
  return (
    <Container className="py-20 md:py-28">
      <p className="text-sm font-bold text-mute">Erreur 404</p>
      <h1 className="mt-3 text-[2rem] leading-tight font-bold md:text-[2.5rem]">Page introuvable</h1>
      <p className="mt-4 max-w-2xl text-lg text-text">
        La page demandée n’existe pas ou a été déplacée lors de la refonte du site. Vérifiez l’adresse ou repartez de l’accueil.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button href="/">Retour à l’accueil</Button>
        <Button href="/actualites" variant="secondary">
          Consulter les actualités
        </Button>
      </div>
    </Container>
  );
}
