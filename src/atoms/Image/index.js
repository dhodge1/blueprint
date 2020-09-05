import styled from "styled-components";

export const Image = styled.img`
  height: ${(p) => p.height || "auto"};
  width: ${(p) => p.width || "auto"};
  ${(p) => p.height && `min-height: ${p.height}`};
  ${(p) => p.width && `min-width: ${p.width}`};
  object-fit: ${(p) => p.objectFit || "cover"};
  ${(p) => p.withBorderRadius && `border-radius: ${p.theme.borderRadius}`};
`;
