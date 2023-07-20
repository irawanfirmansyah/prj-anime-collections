/* eslint-disable no-unused-vars */
import React from "react";
import Backdrop from "../Backdrop/Backdrop";
import { COLORS } from "@/constants/colors";
import CloseIcon from "../CloseIcon/CloseIcon";
import {
  AddAnimeToCollectionModalProps,
  AddAnimeToCollectionType,
} from "./types";
import { useQuery } from "@apollo/client";
import { GET_ANIME_BY_ID } from "@/lib/api";
import { useRouter } from "next/router";

const AddAnimeToCollectionModal = ({
  onSubmit,
  onClickClose,
  error,
  initialValues,
  collections,
}: AddAnimeToCollectionModalProps) => {
  const router = useRouter();
  const animeId = Number(router.query.id);

  const [radioInput, setRadioInput] =
    React.useState<AddAnimeToCollectionType>("NEW");
  const [mapCollections, setMapCollections] = React.useState<
    Record<
      string,
      {
        name: string;
        mapAnimes: Record<PropertyKey, boolean>;
      }
    >
  >(
    collections.reduce((obj, c) => {
      return {
        ...obj,
        [c.id]: {
          name: c.name,
          mapAnimes: Array.from(c.animes).reduce(
            (obj, a) => {
              return {
                ...obj,
                [a]: true,
              };
            },
            {} as Record<PropertyKey, boolean>,
          ),
        },
      };
    }, {}),
  );
  const { data } = useQuery(GET_ANIME_BY_ID, {
    variables: { id: animeId },
    skip: !animeId,
  });

  const handleChangeRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRadioInput(e.target.value as AddAnimeToCollectionType);
  };

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (radioInput === "NEW") {
      const formData = new FormData(e.currentTarget);
      const collectionName = formData.get("collectionName")
        ? String(formData.get("collectionName"))
        : "";
      onSubmit({ type: "NEW", animeId, collectionName });
    }
    if (radioInput === "ADD_TO_EXISTING") {
      const newCollections = collections.map((c) => {
        const newAnimes = new Set(c.animes);
        if (mapCollections[c.id].mapAnimes[animeId]) {
          newAnimes.add(animeId);
        } else {
          newAnimes.delete(animeId);
        }
        return {
          ...c,
          animes: newAnimes,
        };
      });
      onSubmit({ type: "ADD_TO_EXISTING", collections: newCollections });
    }
  };

  const handleChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const collectionId = e.target.id;
    const collection = mapCollections[collectionId];
    const currCollectionAnimes = collection.mapAnimes;
    let newCollectionNames: Record<number, boolean> = {};
    if (currCollectionAnimes[animeId]) {
      const { [animeId]: _, ...restCollectionNames } = currCollectionAnimes;
      newCollectionNames = { ...restCollectionNames };
    } else {
      newCollectionNames = {
        ...currCollectionAnimes,
        [animeId]: true,
      };
    }

    setMapCollections({
      ...mapCollections,
      [collectionId]: {
        ...collection,
        mapAnimes: newCollectionNames,
      },
    });
  };

  const renderAddToExistingCollectionContent = () => (
    <div
      css={{
        "& >label": {
          paddingBottom: "1rem",
        },
        marginBottom: "1rem",
        marginTop: "1rem",
      }}
    >
      {collections.map((c) => (
        <label css={{ display: "block" }} key={c.id} htmlFor={c.id}>
          <input
            id={c.id}
            name="collectionChecks"
            type="checkbox"
            checked={Boolean(mapCollections[c.id].mapAnimes[animeId])}
            onChange={handleChangeCheckbox}
          />
          <span css={{ marginLeft: ".5rem" }}>{c.name}</span>
        </label>
      ))}
    </div>
  );

  const renderAddToNewCollectionContent = () => (
    <>
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
      />
      {error ? (
        <span css={{ color: COLORS.red, fontSize: ".75rem" }}>{error}</span>
      ) : null}
    </>
  );

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
          textAlign: "center",
        }}
      >
        <form
          onSubmit={handleSubmitForm}
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
                textAlign: "left",
              }}
            >
              Add {data?.Media?.title?.romaji} to Collection
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
            <div css={{ display: "flex", alignItems: "center", gap: "2rem" }}>
              <label
                css={{
                  display: "flex",
                  alignItems: "center",
                  padding: "1rem 0",
                  cursor: "pointer",
                  gap: ".5rem",
                }}
                htmlFor="addToNewCollection"
              >
                <input
                  type="radio"
                  name="addToCollection"
                  id="addToNewCollection"
                  value="NEW"
                  checked={radioInput === "NEW"}
                  onChange={handleChangeRadio}
                />
                <p>Add to new collection</p>
              </label>
              <label
                htmlFor="addToExistingCollection"
                css={{
                  display: "flex",
                  alignItems: "center",
                  padding: "1rem 0",
                  cursor: "pointer",
                  gap: ".5rem",
                }}
              >
                <input
                  type="radio"
                  name="addToCollection"
                  id="addToExistingCollection"
                  value="ADD_TO_EXISTING"
                  checked={radioInput === "ADD_TO_EXISTING"}
                  onChange={handleChangeRadio}
                />
                <p>Add to existing collection</p>
              </label>
            </div>
            {radioInput === "NEW" ? renderAddToNewCollectionContent() : null}
            {radioInput === "ADD_TO_EXISTING"
              ? renderAddToExistingCollectionContent()
              : null}
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

export default AddAnimeToCollectionModal;
