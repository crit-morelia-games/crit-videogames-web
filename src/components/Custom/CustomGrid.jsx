import {
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
  GridToolbarContainer,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { useThemeContext } from "../../hooks/useAppContext";
import React from "react";

function CustomGrid() {
  const { theme } = useThemeContext();
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton style={{ color: theme.text }} />
      <GridToolbarFilterButton style={{ color: theme.text }} />
      <GridToolbarDensitySelector style={{ color: theme.text }} />
      <GridToolbarExport style={{ color: theme.text }} />
      <GridToolbarQuickFilter
        style={{
          color: theme.text,
          display: "flex",
          marginLeft: "auto",
        }}
      />
    </GridToolbarContainer>
  );
}

export default CustomGrid;
