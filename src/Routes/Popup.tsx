import styled from "styled-components";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useRecoilState } from "recoil";
import { popupAtom } from "../atom";

const Section = styled.div`

`;

function Popup() {
  const [open, setOpen] = useRecoilState(popupAtom);

  return (<Section>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>

        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} >확인</Button>
        </DialogActions>
      </Dialog>
  </Section>)
}

export default Popup;