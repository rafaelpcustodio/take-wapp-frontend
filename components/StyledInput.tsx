import styled from 'styled-components';

const StyledInput = styled.input`
  border: 0;
  border-bottom: 1px solid #e5e5e5;
  display: block;
  margin: 0 auto;
  margin-top: 2rem;
  padding: 10px 15px;
  type: ${(props: any) => props.type};
  width: 450px;
`;

export default StyledInput;
