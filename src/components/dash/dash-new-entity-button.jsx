import { Button } from "@mui/material";

const NewPlayerButton = ({labelNew, onClick}) => {
    return(
        <>
      <Button
        variant="outlined"
        color="primary"
        onClick={onClick}
        style={{ marginLeft: "auto" }}
      >
        {labelNew}
      </Button>
          </>
    );

  };

  export default NewPlayerButton;