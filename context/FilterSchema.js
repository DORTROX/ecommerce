import React, { createContext, useContext, useState } from "react";

const Context = createContext();

export const FilterContext = ({ children }) => {
  const [query, setquery] = useState({
    design_Query: [],
    color_Query: [],
    material_Query: [],
  });
  const addDesignQuery = (event) => {
    const selectedDesign = event;
    setquery((prevState) => {
      if (prevState.design_Query.includes(selectedDesign)) {
        return {
          ...prevState,
          design_Query: prevState.design_Query.filter(
            (design) => design !== selectedDesign
          ),
        };
      } else {
        return {
          ...prevState,
          design_Query: [...prevState.design_Query, selectedDesign],
        };
      }
    });
  };

  const addMaterialQuery = (event) => {
    const selectedMaterial = event;
    setquery((prevState) => {
      if (prevState.material_Query.includes(selectedMaterial)) {
        return {
          ...prevState,
          material_Query: prevState.material_Query.filter(
            (material) => material !== selectedMaterial
          ),
        };
      } else {
        return {
          ...prevState,
          material_Query: [...prevState.material_Query, selectedMaterial],
        };
      }
    });
  };

  const addColorQuery = (event) => {
    const selectedColor = event;
    setquery((prevState) => {
      if (prevState.color_Query.includes(selectedColor)) {
        return {
          ...prevState,
          color_Query: prevState.color_Query.filter(
            (color) => color !== selectedColor
          ),
        };
      } else {
        return {
          ...prevState,
          color_Query: [...prevState.color_Query, selectedColor],
        };
      }
    });
  };
  return (
    <Context.Provider
      value={{
        addDesignQuery,
        addColorQuery,
        addMaterialQuery,
        query,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useFilterContext = () => useContext(Context);
