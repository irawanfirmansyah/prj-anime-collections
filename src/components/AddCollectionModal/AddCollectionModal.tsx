import React from "react";
import { AddCollectionModalProps } from "./types";
import { Backdrop, CloseIcon } from "@/components";
import { COLORS } from "@/constants/colors";

const AddCollectionModal = ({
  onSubmit,
  onClickClose,
  error,
  initialValues,
}: AddCollectionModalProps) => {
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const collectionName = formData.get("collectionName")
      ? String(formData.get("collectionName"))
      : "";
    onSubmit({ collectionName });
  };

  return (
    <>
      <Backdrop />
      <div
        css={{
          borderRadius: ".875rem",
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          backgroundColor: COLORS.white,
          display: "flex",
          flexDirection: "column",
          top: "50%",
          left: "50%",
          position: "fixed",
          zIndex: 100,
          transform: "translate(-50%, -50%)",
          padding: "1rem 2rem",
          maxWidth: "400px",
          textAlign: "center",
        }}
      >
        <form
          onSubmit={handleFormSubmit}
          css={{
            "& > *:not(:last-child)": {
              marginBottom: "1rem",
            },
          }}
        >
          <div
            css={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              gap: "2rem",
              marginBottom: "1rem",
            }}
          >
            <p
              css={{
                fontWeight: 600,
                fontSize: "1.5rem",
              }}
            >
              {initialValues ? "Edit Collection" : "Add a Collection"}
            </p>
            <CloseIcon
              onClick={() => {
                onClickClose();
              }}
              css={{
                marginLeft: "auto",
                cursor: "pointer",
              }}
            />
          </div>
          <div
            css={{
              marginBottom: "2rem",
              textAlign: "left",
            }}
          >
            <label
              htmlFor="collectionName"
              css={{
                display: "block",
                marginBottom: ".25rem",
                fontWeight: 600,
              }}
            >
              Collection Name
            </label>
            <input
              defaultValue={initialValues?.collectionName}
              id="collectionName"
              name="collectionName"
              css={{
                display: "block",
                borderRadius: ".25rem",
                padding: ".25rem .5rem",
                width: "100%",
                borderWidth: "1px",
                borderStyle: "solid",
                fontSize: "1rem",
                ...(error && {
                  outlineColor: COLORS.red,
                  borderColor: COLORS.red,
                }),
              }}
              type="text"
              pattern="[a-zA-Z0-9\s]+"
              title="No special characters allowed"
              minLength={3}
            />
            {error ? (
              <span css={{ color: COLORS.red, fontSize: ".75rem" }}>
                {error}
              </span>
            ) : null}
          </div>
          <button
            css={{
              padding: ".5rem .875rem",
              backgroundColor: COLORS.blue,
              ":hover": {
                backgroundColor: COLORS.darkBlue,
              },
              color: COLORS.white,
              border: `1px solid ${COLORS.darkBlue}`,
              borderRadius: ".5rem",
              flex: 1,
              fontWeight: 600,
              width: "100%",
            }}
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default AddCollectionModal;
