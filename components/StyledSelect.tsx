import styled from 'styled-components';

const StyledSelect = styled.select`
  background-color: #f0f0f0;
  border: 1px solid #f0f0f0;
  border-radius: 10px;
  color: #9d9d9d;
  font-size: 16px;
  padding: 10px 15px;
  margin: 0 0 1rem 0;
  width: 450px;
  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }
  &:hover {
    cursor: pointer;
  }
`;

export default StyledSelect;
