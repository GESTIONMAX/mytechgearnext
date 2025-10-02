interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const faqData: FAQItem[] = [
  {
    id: 'sport-1',
    question: "Les lunettes sport sont-elles résistantes à l'eau ?",
    answer:
      "Oui, nos lunettes sport sont certifiées IP67, ce qui signifie qu'elles sont résistantes à l'eau jusqu'à 1 mètre de profondeur pendant 30 minutes. Parfaites pour la natation et les sports aquatiques.",
  },
  {
    id: 'sport-2',
    question: "Quelle est l'autonomie de la batterie pour le sport ?",
    answer:
      "Nos lunettes sport offrent jusqu'à 8 heures d'autonomie en mode sport intensif. En mode économie, vous pouvez atteindre 12 heures d'utilisation continue.",
  },
  {
    id: 'sport-3',
    question: 'Les lunettes sport sont-elles compatibles avec les casques ?',
    answer:
      "Absolument ! Nos lunettes sport sont conçues pour s'adapter parfaitement aux casques de vélo, ski et autres équipements de protection. Le design ergonomique assure un confort optimal.",
  },
  {
    id: 'sport-4',
    question: 'Puis-je utiliser les lunettes sport en montagne ?',
    answer:
      'Oui, nos lunettes sport sont parfaites pour la montagne. Elles offrent une protection UV400, une résistance aux chocs et des fonctionnalités GPS pour la navigation en altitude.',
  },
];

export const getFAQByCategory = (category: string): FAQItem[] => {
  return faqData.filter((item) => item.id.startsWith(category));
};
