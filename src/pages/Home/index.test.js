/* eslint-disable no-unused-expressions */
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Home from "./index";

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      await screen.findByText("Message envoyé !");
    });
  });

});

// Ajout de tests d'intégration
describe("When a page is created", () => {
  it("a list of events is displayed", async () => {
    render(<Home />);
    
    // Vérifie que le titre "Nos réalisations" est bien affiché
    const nosReal = await screen.getByTestId("realisation-title");
    expect(nosReal).toBeInTheDocument();
    
    // Vérifie que la liste des événements est affichée
    const eventsList = await screen.getByTestId("events-list");
    expect(eventsList).toBeInTheDocument();
  });

  it("a list of people is displayed", async () => {
    render(<Home />);
    
    // Vérifie la présence des membres de l'équipe
    await screen.findByText("Samira");
    await screen.findByText("Jean-baptiste");
    await screen.findByText("Alice");
    await screen.findByText("Luís");
    await screen.findByText("Christine");
    await screen.findByText("Isabelle");
  });

  it("a footer is displayed", async () => {
    render(<Home />);
    
    // Vérifie que le footer est affiché
    const footer = screen.getByRole('contentinfo'); // 'contentinfo' correspond au footer
    expect(footer).toBeInTheDocument();
    
    // Vérifie le contenu du footer
    expect(screen.getByText("Notre derniére prestation")).toBeInTheDocument();
    expect(screen.getByText("Contactez-nous")).toBeInTheDocument();
  });

  it("an event card, with the last event, is displayed", async () => {
    render(<Home />);
    
    // Utilise waitFor pour s'assurer que l'événement est bien affiché
    await waitFor(() => {
      const eventCard = screen.getByTestId("last-event");
      expect(eventCard).toBeInTheDocument();

      // Vérifie que le titre du dernier événement est affiché
      const lastEventTitle = screen.getByText(/Événement Inconnu/i); // Remplacez par le vrai titre si connu
      expect(lastEventTitle).toBeInTheDocument();
    });
  });
});