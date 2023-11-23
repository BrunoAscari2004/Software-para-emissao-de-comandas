import { AppBar, Paper, Tab, Tabs } from '@material-ui/core';
import { TabContext, TabPanel } from '@material-ui/lab';
import NlFormLayout from '@shared/components/NlFormLayout';
import React, { useState } from 'react';
import AdvancedFormTab from './components/AdvancedFormTab';
import ButtonsTab from './components/ButtonsTab';
import DrawerTab from './components/DrawerTab';
import FieldsTab from './components/FieldsTab';
import SimpleFormTab from './components/SimpleFormTab';
import TableTab from './components/TableTab';
import ThemeTab from './components/ThemeTab';
import ValidationsTab from './components/ValidationsTab';

const NlApresentacao: React.FC = () => {
  const [currentOpenTab, setCurrentOpenTab] = useState(0);

  function handleTabClick(e: any, newValue: number) {
    setCurrentOpenTab(newValue);
  }

  return (
    <>
      <NlFormLayout isLoading={false}>
        <Paper className="m-5 min-h-full">
          <TabContext value={String(currentOpenTab)}>
            <AppBar position="static" color="default" elevation={2}>
              <Tabs
                variant="scrollable"
                value={currentOpenTab}
                onChange={handleTabClick}
                indicatorColor="primary"
                textColor="primary"
              >
                <Tab label="Tabela" />
                <Tab label="Campos" />
                <Tab label="Botões" />
                <Tab label="Gavetas" />
                <Tab label="Temas" />
                <Tab label="Form Simples" />
                <Tab label="Validações" />
                <Tab label="Form Avançado" />
              </Tabs>
            </AppBar>
            <TabPanel value="0">
              <TableTab />
            </TabPanel>
            <TabPanel value="1">
              <FieldsTab />
            </TabPanel>
            <TabPanel value="2">
              <ButtonsTab />
            </TabPanel>
            <TabPanel value="3">
              <DrawerTab />
            </TabPanel>
            <TabPanel value="4">
              <ThemeTab />
            </TabPanel>
            <TabPanel value="5">
              <SimpleFormTab />
            </TabPanel>
            <TabPanel value="6">
              <ValidationsTab />
            </TabPanel>
            <TabPanel value="7">
              <AdvancedFormTab />
            </TabPanel>
          </TabContext>
        </Paper>
      </NlFormLayout>
    </>
  );
};

export default NlApresentacao;
