import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";

import { HomePage } from "../../components/HomePage";
import { CodingExerciseTemplatePage } from "../../components/CodingExerciseTemplatePage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/coding-exercise-template/:codingExerciseTemplateId"
        element={<CodingExerciseTemplatePage />}
      />
    </>
  )
);

export const queryClient = new QueryClient();

export const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen min-w-screen">
        <RouterProvider router={router}></RouterProvider>
      </div>
    </QueryClientProvider>
  );
};
