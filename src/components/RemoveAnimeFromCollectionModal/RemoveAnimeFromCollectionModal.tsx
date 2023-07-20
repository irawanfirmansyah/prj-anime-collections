import Backdrop from "../Backdrop/Backdrop";
import { COLORS } from "@/constants/colors";

const RemoveAnimeFromCollectionModal = ({
  onClickConfirm,
  onClickCancel,
  animeTitle,
  collectionName,
}: {
  animeTitle: string;
  collectionName: string;
  onClickConfirm: () => void;
  onClickCancel: () => void;
}) => {
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
          maxWidth: "600px",
        }}
      >
        <p
          css={{
            fontWeight: 600,
            fontSize: "1.5rem",
            marginBottom: "1rem",
          }}
        >
          Remove anime from collection
        </p>
        <p css={{ marginBottom: "1rem" }}>
          Are you sure you want to remove {animeTitle} from collection{" "}
          {collectionName}?
        </p>
        <div
          css={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            columnGap: ".5rem",
          }}
        >
          <button
            css={{
              padding: ".5rem .875rem",
              backgroundColor: COLORS.white,
              border: `1px solid ${COLORS.black}`,
              borderRadius: ".5rem",
              flex: 1,
              ":hover": {
                backgroundColor: COLORS.grey,
              },
              fontWeight: 600,
            }}
            onClick={onClickCancel}
          >
            Cancel
          </button>
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
            }}
            onClick={onClickConfirm}
          >
            OK
          </button>
        </div>
      </div>
    </>
  );
};

export default RemoveAnimeFromCollectionModal;
