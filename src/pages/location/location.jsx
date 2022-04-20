import React from "react";
import "./location.jsx";
import { Box } from "@material-ui/core";
import PageContainer from "../../components/container/page-container/page-container.jsx";
import PrimaryButton from "../../components/buttons/primaryButton/primaryButton.jsx";
import CarroTextField from "../../components/text-field/carro-text-field.jsx";
import SearchIcon from '@material-ui/icons/Search';
import LocationTable from "../../components/LocationTable/LocationTable.jsx";
import { InputAdornment } from "@material-ui/core";

const LocationPage = () => {
  return (
    <PageContainer>
      <Box
        width="90%"
        display="flex"
        justifyContent="space-between"
        alignItems="baseline"
        paddingBottom="2%"
      >
        <Box textAlign="left" fontSize="35px">
          Locatii
        </Box>

        <Box sx={{ width: 334 }}>
          <PrimaryButton
            variant="contained"
            fullWidth
            color="primary"
            style={{fontWeight: "600"}}
            
          >
            ADAUGA LOCATIE
          </PrimaryButton>
        </Box>
      </Box>
      <Box
        width="90%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        paddingTop="2%"
      >
        <Box textAlign="left" fontSize="35px">
          <CarroTextField variant="outlined" label="Cauta o locatie"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon/>
              </InputAdornment>
            ),
          }} />
        </Box>
      </Box>
      <Box
        width="90%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        paddingTop="2%"
      >
        <LocationTable/>
      </Box>
    </PageContainer>
  );
};

export default LocationPage;
