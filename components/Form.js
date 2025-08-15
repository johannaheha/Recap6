import styled from "styled-components";
import { StyledButton } from "./StyledButton";
import useSWR from "swr";
import { useState } from "react";

export const FormContainer = styled.form`
  display: grid;
  gap: 0.5rem;
`;

export const Input = styled.input`
  padding: 0.5rem;
  font-size: inherit;
  border: 1px solid black;
  border-radius: 0.5rem;
`;

export const Textarea = styled.textarea`
  font-family: inherit;
  border: 1px solid black;
  border-radius: 0.5rem;
  padding: 0.5rem;
`;

export const Label = styled.label`
  font-weight: bold;
`;

export default function Form({ onSubmit, formName, defaultData }) {
  const [isEditMode, setIsEditMode] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    onSubmit(data);
  }

  return (
    <FormContainer aria-labelledby={formName} onSubmit={handleSubmit}>
      <Label htmlFor="name">Name</Label>
      <Input
        required
        id="name"
        name="name"
        type="text"
        defaultValue={defaultData?.name}
      />
      <Label htmlFor="image-url">Image Url</Label>
      <Input
        required
        id="image-url"
        name="image"
        type="text"
        defaultValue={defaultData?.image}
      />
      <Label htmlFor="location">Location</Label>
      <Input
        required
        id="location"
        name="location"
        type="text"
        defaultValue={defaultData?.location}
      />
      <Label htmlFor="map-url">Map Url</Label>
      <Input
        required
        id="map-url"
        name="mapURL"
        type="text"
        defaultValue={defaultData?.mapURL}
      />
      <Label htmlFor="description">Description</Label>
      <Textarea
        required
        name="description"
        id="description"
        cols="30"
        rows="10"
        defaultValue={defaultData?.description}
      ></Textarea>
      <StyledButton
        type="submit"
        onClick={() => {
          setIsEditMode(!isEditMode);
        }}
      >
        {defaultData ? "Update place" : "Add place"}
      </StyledButton>
    </FormContainer>
  );
}
