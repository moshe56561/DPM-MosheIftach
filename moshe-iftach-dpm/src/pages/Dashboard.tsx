import React, { useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";
import Header from "../reusable_components/Header";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import ReusableCardForm from "../reusable_components/ReusableCardForm";
import { useNavigate } from "react-router-dom";
import {
  handleCreateTask,
  handleEditTask,
  mapCardToTask,
  handleDeleteTask,
  handleGetTask,
  mapTasksToCards,
} from "../utils/taskUtils";
import { ICardItem } from "../interfaces/interfaces";

const Dashboard: React.FC = () => {
  const [currentTasksArray, setCurrentTasksArray] = useState<ICardItem[]>([]);
  const user = useSelector((state: RootState) => state.auth.user);
  const tasksArray = useSelector((state: RootState) => state.tasks.tasks);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (user) {
        handleGetTask(user, dispatch);
      }
    } else {
      navigate("/login");
    }
  }, [user]);

  useEffect(() => {
    if (tasksArray.length) {
      setCurrentTasksArray(mapTasksToCards(tasksArray));
    }
  }, [tasksArray]);

  return (
    <Container>
      <Header email={user?.email || "Guest"} />
      <Typography variant="h4" sx={{ mt: 4 }}>
        <ReusableCardForm
          formTitle="Tasks Manager"
          inputLabels={{
            titleLabel: "Task Title",
            descriptionLabel: "Task Description",
          }}
          preLoadedData={currentTasksArray}
          handleAddCardCB={async (Card: ICardItem) => {
            if (user) {
              await handleCreateTask(
                mapCardToTask(Card, user?._id),
                user,
                dispatch
              );
            }
          }}
          handleEditCardCB={async (Card: ICardItem) => {
            if (user) {
              await handleEditTask(
                mapCardToTask(Card, user?._id),
                user,
                dispatch
              );
            }
          }}
          handleDeleteCardCB={async (Card: ICardItem) => {
            if (user) {
              await handleDeleteTask(
                mapCardToTask(Card, user?._id),
                user,
                dispatch
              );
            }
          }}
        />
      </Typography>
    </Container>
  );
};

export default Dashboard;
