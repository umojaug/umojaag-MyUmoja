import createPersistedState from "use-persisted-state-18";
const useCartState = createPersistedState("journalCart");

const useJournalCart = () => {
  const [journals, setJournals] = useCartState([]);

  const addToCart = (journal) => {
    let journalLength = journals.length;

    if (journalLength !== 0) {
      const journalFound = journals.find(
        (item) => item.ledgerNameCode === journal.ledgerNameCode
      );
      journalLength = journalFound === undefined ? 0 : journalFound.length;
    }

    if (journalLength === 0) {
      setJournals([...journals, journal]);
    }
  };

  const deleteFromCart = (ledgerNameCode) => {
    const newJournalList = journals.filter(
      (item) => item.ledgerNameCode !== ledgerNameCode
    );
    setJournals(newJournalList);
  };

  const emptyCart = () => {
    setJournals([]);
  };

  const balance = journals.reduce((accumulator, item) => {
    return (accumulator += item.dr - item.cr);
  }, 0);

  return {
    journals,
    addToCart,
    deleteFromCart,
    emptyCart,
    balance,
  };
};

export default useJournalCart;
