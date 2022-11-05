import React, { useState } from "react";
import { CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  FormControl,
  TextInput,
} from "@link-to-code/ui";

import { CopyUrlButton } from "./CopyUrlButton";
import { useCreateInterviewRoom } from "../../mutations";

const toFullUrl = (url: string) => `${window.location.origin}${url}`;

export interface CreateInterviewRoomDialogProps {
  codingExerciseTemplateId?: string;
}

export const CreateInterviewRoomDialog: React.FC<CreateInterviewRoomDialogProps> = ({
  codingExerciseTemplateId,
}) => {
  const [modalOpened, setModalOpened] = useState(false);
  const { mutate: createInterviewRoom, data, isLoading, isError, isSuccess } = useCreateInterviewRoom();

  const onCreateInterviewRoomButtonClick = () => {
    createInterviewRoom(codingExerciseTemplateId, {
      onSettled() {
        setModalOpened(true);
      },
      onError(error) {
        console.error(error);
      },
    });
  };

  return (
    <>
      <Dialog open={!isLoading && modalOpened} onOpenChange={(state) => setModalOpened(state)}>
        <DialogTrigger asChild>
          <Button type="primary" size="block" loading={isLoading} onClick={onCreateInterviewRoomButtonClick}>
            Create interview room
          </Button>
        </DialogTrigger>
        <DialogContent
          onPointerDownOutside={(event) => {
            event.preventDefault();
          }}
        >
          <DialogHeader>
            <DialogTitle asChild>
              <h1>Your next interview</h1>
            </DialogTitle>
            <DialogClose />
          </DialogHeader>

          {(isError || !data) && (
            <div className="alert alert-error">
              <ExclamationCircleIcon className="h-16" />
              <span>
                Oops! Seems like we had an issue creating a new room for this exercise! Maybe try again in a
                few moments?
              </span>
            </div>
          )}

          {isSuccess && data && (
            <>
              <DialogDescription asChild>
                <div>
                  <div className="alert alert-success">
                    <CheckCircleIcon className="h-16" />
                    <span>Yay! We've created a new room for you. You're ready to start your interview!</span>
                  </div>

                  <p>
                    You can share the below guest link with the candidate. We've created an admin link for you
                    to use and share with other interviewers. An admin link has more power over the interview
                    room.
                  </p>

                  <p>
                    <strong>
                      Remember to share only the guest link with a candidate, keeping the admin link for you
                      only.
                    </strong>
                  </p>
                </div>
              </DialogDescription>

              <div className="mt-10">
                <FormControl
                  className="mb-5"
                  text="Guest link"
                  alt={<CopyUrlButton url={toFullUrl(data.guestLink)} />}
                  input={<TextInput bordered readOnly value={toFullUrl(data.guestLink)} />}
                />

                <FormControl
                  text="Admin link"
                  alt={<CopyUrlButton url={toFullUrl(data.adminLink)} />}
                  input={<TextInput bordered readOnly value={toFullUrl(data.adminLink)} />}
                />
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
