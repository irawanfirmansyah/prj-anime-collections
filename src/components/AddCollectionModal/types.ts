/* eslint-disable no-unused-vars */

export type AddCollectionModalProps = {
  onSubmit: ({ collectionName }: { collectionName: string }) => void;
  onClickClose: () => void;
  error?: string;
  initialValues?: { collectionName: string };
};
