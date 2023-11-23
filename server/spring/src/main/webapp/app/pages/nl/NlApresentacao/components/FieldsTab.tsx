import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import axios from 'axios';
import React, { useState } from 'react';
import NlLabel from '@shared/components/NlLabel';
import Lov from '@shared/components/NlLov';

const itensTipCaixa = [
  { id: null, label: 'Nenhum' },
  { id: 1, label: 'PDV' },
  { id: 2, label: 'Cofre gerência' },
  { id: 3, label: 'Boca de lobo (cofre)' },
  { id: 4, label: 'Totem' },
  { id: 5, label: 'Farmácia' },
  { id: 6, label: 'OMS' },
  { id: 7, label: 'APP SAT' },
  { id: 8, label: 'Crediário' },
  { id: 9, label: 'Outro' },
];

const FieldsTab: React.FC = () => {
  const [radioValue, setRadioValue] = useState(0);
  const [checkboxValue, setCheckboxValue] = useState(false);
  const [isAddCountryModalOpen, setIsAddCountryModalOpen] = useState(false);

  async function getData() {
    const response = await axios.get('https://covid-api.mmediagroup.fr/v1/cases?country=Brazil');

    let id = 1;

    return Object.keys(response.data)
      .filter(data => data !== 'All')
      .map(data => ({
        codEstado: id++,
        desEstado: data,
      }));
  }

  async function getDataPaises() {
    type IAxiosPaises = {
      [key: string]: {
        All: {
          abbreviation: string;
          capital_city: string;
        };
      };
    };

    const response = await axios.get<IAxiosPaises>('https://covid-api.mmediagroup.fr/v1/cases');

    let id = 1;

    return Object.entries(response.data)
      .filter(data => data[0] !== 'Global')
      .map(data => ({
        codPais: id++,
        desPais: data[0],
        desPais2: data[1].All.capital_city,
        desPais3: data[1].All.abbreviation,
      }));
  }

  return (
    <>
      <div className="grid-cols-2-auto gap-2 grid items-center">
        <NlLabel>Código:</NlLabel>
        <TextField variant="filled" color="primary" type="number" InputProps={{ inputProps: { min: 0 } }} />

        <NlLabel>Descrição:</NlLabel>
        <TextField variant="filled" color="primary" />

        <NlLabel>Paises:</NlLabel>
        <Lov id="lovPaises" getData={getDataPaises} onAddOpen={() => setIsAddCountryModalOpen(true)} />

        <NlLabel>Estados do Brasil:</NlLabel>
        <Lov id="lovEstado" getData={getData} />

        <NlLabel>Tipo do caixa:</NlLabel>
        <Autocomplete
          options={itensTipCaixa}
          getOptionLabel={option => option.label}
          renderInput={params => <TextField {...params} color="primary" />}
        />

        <span />
        <Box display="flex">
          <FormControlLabel
            control={
              <Checkbox checked={checkboxValue} color="primary" onChange={() => setCheckboxValue(!checkboxValue)} />
            }
            label={'On-line'}
          />
        </Box>

        <div className="flex w-full h-full justify-end pt-2">
          <NlLabel>Contrapartida:</NlLabel>
        </div>
        <RadioGroup
          value={radioValue}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setRadioValue(Number((event.target as HTMLInputElement).value))
          }
        >
          <FormControlLabel value={0} control={<Radio color="primary" />} label="Opção 1" />
          <FormControlLabel value={1} control={<Radio color="primary" />} label="Opção 2" />
          <FormControlLabel value={2} control={<Radio color="primary" />} label="Opção 3" />
          <FormControlLabel value={3} control={<Radio color="primary" />} label="Opção 4" />
        </RadioGroup>

        <NlLabel>Data:</NlLabel>
        <TextField variant="filled" color="primary" type="date" />

        <NlLabel>Data e hora:</NlLabel>
        <TextField variant="filled" color="primary" type="datetime-local" />
      </div>

      <Dialog open={isAddCountryModalOpen} onClose={() => setIsAddCountryModalOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Países</DialogTitle>
        <DialogContent>
          <div className="grid-cols-2-auto gap-2 grid">
            <NlLabel>Código:</NlLabel>
            <TextField color="primary" variant="filled" type="number" InputProps={{ inputProps: { min: 0 } }} />
            <NlLabel>Nome:</NlLabel>
            <TextField color="primary" variant="filled" />
          </div>
        </DialogContent>
        <DialogActions>
          <div className="flex w-full justify-center gap-x-3">
            <Button color="primary" variant="contained" size="small" onClick={() => setIsAddCountryModalOpen(false)}>
              Aplicar
            </Button>
            <Button color="primary" variant="contained" size="small" onClick={() => setIsAddCountryModalOpen(false)}>
              Adicionar
            </Button>
            <Button color="primary" variant="contained" size="small" onClick={() => setIsAddCountryModalOpen(false)}>
              Fechar
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FieldsTab;
