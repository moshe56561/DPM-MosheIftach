import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  TextField,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  Snackbar,
  Alert,
} from "@mui/material";
import { ICardItem } from "../interfaces/interfaces";

interface ReusableCardFormProps {
  formTitle?: string;
  inputLabels?: {
    titleLabel: string;
    descriptionLabel: string;
  };
  handleAddCardCB?: Function;
  handleEditCardCB?: Function;
  handleDeleteCardCB?: Function;
  preLoadedData?: ICardItem[];
}

const ReusableCardForm: React.FC<ReusableCardFormProps> = ({
  formTitle = "Manage Cards",
  inputLabels = {
    titleLabel: "New Card Title",
    descriptionLabel: "New Card Description",
  },
  handleAddCardCB,
  handleEditCardCB,
  handleDeleteCardCB,
  preLoadedData,
}) => {
  const [cards, setCards] = useState<ICardItem[]>([]);
  const [newCard, setNewCard] = useState({
    title: "",
    description: "",
    status: "Active",
  });
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (preLoadedData?.length) {
      setCards(preLoadedData);
    }
  }, [preLoadedData]);

  // Function to filter cards based on the search term
  const filteredCards = cards.filter(
    (card) =>
      card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCard = async () => {
    if (!newCard.title || !newCard.description) {
      setErrorMessage("Title and Description are required.");
      setOpenSnackbar(true);
      return;
    }

    const now = new Date().toISOString();

    const currentCardToAdd: ICardItem = {
      id: Date.now(),
      title: newCard.title,
      description: newCard.description,
      createdAt: now,
      updatedAt: now,
      status: newCard.status,
      isEditing: false,
    };

    let callbackSuccess = false;

    if (handleAddCardCB) {
      try {
        await handleAddCardCB(currentCardToAdd);
        callbackSuccess = true;
      } catch (error) {
        setErrorMessage("Failed to add card");
        setOpenSnackbar(true);
      }
    }

    if (callbackSuccess || !handleAddCardCB) {
      setCards((prevCards) => [...prevCards, currentCardToAdd]);
    }

    setNewCard({ title: "", description: "", status: "Active" });
  };

  const handleEditCard = async (
    id: number,
    field: "title" | "description" | "status",
    value: string
  ) => {
    const cardToUpdate = cards.find((card) => card.id === id);
    if (cardToUpdate) {
      const updatedCard = {
        ...cardToUpdate,
        [field]: value,
        updatedAt: new Date().toISOString(),
      };
      const updatedCards = cards.map((card) =>
        card.id === id ? updatedCard : card
      );
      setCards(updatedCards);
    }
  };

  const handleDeleteCard = (id: number) => {
    if (handleDeleteCardCB) {
      const cardToDelete = cards.find((card) => card.id === id);
      handleDeleteCardCB(cardToDelete);
    }
    setCards(cards.filter((card) => card.id !== id));
  };

  const handleSaveCard = async (id: number) => {
    const updatedCard = cards.find((card) => card.id === id);
    if (updatedCard) {
      if (handleEditCardCB) {
        await handleEditCardCB({
          ...updatedCard,
          isEditing: false,
          updatedAt: new Date().toISOString(),
        });
      }
      setCards(
        cards.map((card) =>
          card.id === id
            ? {
                ...updatedCard,
                isEditing: false,
                updatedAt: new Date().toISOString(),
              }
            : card
        )
      );
    }
  };

  const handleCancelEdit = (id: number) => {
    setCards(
      cards.map((card) =>
        card.id === id ? { ...card, isEditing: false } : card
      )
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}/${month}/${year} - ${hours}:${minutes}`;
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container>
      <Typography variant="h5" sx={{ mb: 2 }}>
        {formTitle}
      </Typography>

      {/* Search Bar */}
      {cards.length > 0 && (
        <TextField
          fullWidth
          label="Search Tasks"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: 2 }}
        />
      )}

      {/* New Card Inputs and Add Card Button */}
      <TextField
        fullWidth
        label={inputLabels.titleLabel}
        value={newCard.title}
        onChange={(e) => setNewCard({ ...newCard, title: e.target.value })}
        sx={{ mt: 2 }}
      />
      <TextField
        fullWidth
        multiline
        label={inputLabels.descriptionLabel}
        value={newCard.description}
        onChange={(e) =>
          setNewCard({ ...newCard, description: e.target.value })
        }
        sx={{ mt: 1 }}
      />

      {/* Status Toggle Button Group */}
      <Typography variant="body2" sx={{ mt: 2 }}>
        Status:
      </Typography>
      <ToggleButtonGroup
        value={newCard.status}
        exclusive
        onChange={(_, value) => setNewCard({ ...newCard, status: value })}
        aria-label="card status"
        sx={{ display: "flex", justifyContent: "space-evenly", mb: 2 }}
      >
        <ToggleButton
          value="Active"
          aria-label="active"
          sx={{ borderRadius: "50%" }}
        >
          Active
        </ToggleButton>
        <ToggleButton
          value="Pending"
          aria-label="pending"
          sx={{ borderRadius: "50%" }}
        >
          Pending
        </ToggleButton>
        <ToggleButton
          value="Done"
          aria-label="done"
          sx={{ borderRadius: "50%" }}
        >
          Done
        </ToggleButton>
      </ToggleButtonGroup>

      <Button
        variant="contained"
        color="primary"
        onClick={handleAddCard}
        sx={{ mt: 2 }}
      >
        Add Card
      </Button>

      {/* Cards Section */}
      <Grid container spacing={2} sx={{ mt: 4 }}>
        {filteredCards.map((card) => (
          <Grid item xs={12} sm={6} md={4} key={card.id}>
            <Card>
              <CardContent>
                {/* Title */}
                {card.isEditing ? (
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Title"
                    value={card.title}
                    onChange={(e) =>
                      handleEditCard(card.id, "title", e.target.value)
                    }
                    sx={{ mb: 1 }}
                  />
                ) : (
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    {card.title}
                  </Typography>
                )}

                {/* Description */}
                {card.isEditing ? (
                  <TextField
                    fullWidth
                    multiline
                    variant="outlined"
                    label="Description"
                    value={card.description}
                    onChange={(e) =>
                      handleEditCard(card.id, "description", e.target.value)
                    }
                    sx={{ mb: 1 }}
                  />
                ) : (
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    {card.description}
                  </Typography>
                )}

                {/* Date and Status */}
                <Typography variant="body2">
                  Created At: {formatDate(card.createdAt)}
                </Typography>
                <Typography variant="body2">
                  Updated At: {formatDate(card.updatedAt)}
                </Typography>
                <Typography variant="body2">Status: {card.status}</Typography>

                {/* Status Toggle Button Group for Editing */}
                {card.isEditing && (
                  <ToggleButtonGroup
                    value={card.status}
                    exclusive
                    onChange={(_, value) =>
                      handleEditCard(card.id, "status", value)
                    }
                    aria-label="card status"
                    sx={{
                      display: "flex",
                      justifyContent: "space-evenly",
                      mt: 2,
                    }}
                  >
                    <ToggleButton
                      value="Active"
                      aria-label="active"
                      sx={{ borderRadius: "50%" }}
                    >
                      Active
                    </ToggleButton>
                    <ToggleButton
                      value="Pending"
                      aria-label="pending"
                      sx={{ borderRadius: "50%" }}
                    >
                      Pending
                    </ToggleButton>
                    <ToggleButton
                      value="Done"
                      aria-label="done"
                      sx={{ borderRadius: "50%" }}
                    >
                      Done
                    </ToggleButton>
                  </ToggleButtonGroup>
                )}
              </CardContent>

              <CardActions>
                {card.isEditing ? (
                  <>
                    <Button
                      color="primary"
                      onClick={() => handleSaveCard(card.id)}
                    >
                      Save
                    </Button>
                    <Button
                      color="secondary"
                      onClick={() => handleCancelEdit(card.id)}
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      color="primary"
                      onClick={() =>
                        setCards(
                          cards.map((c) =>
                            c.id === card.id ? { ...c, isEditing: true } : c
                          )
                        )
                      }
                    >
                      Edit
                    </Button>
                    <Button
                      color="secondary"
                      onClick={() => handleDeleteCard(card.id)}
                    >
                      Delete
                    </Button>
                  </>
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Snackbar for Validation Error */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: "100%" }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ReusableCardForm;
