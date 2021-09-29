import SyntaxHighlighter from 'react-syntax-highlighter';
import html from 'prettier/parser-html';
import prettier from 'prettier/standalone';
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { ChangeEvent, useState } from 'react';
import {
  Paper,
  Tabs,
  Tab,
  Box,
  Typography,
  IconButton,
  Tooltip,
  Snackbar,
  Alert,
} from '@mui/material';
import { CodeObject } from '../../components/types/generator/types';
import CopyAllIcon from '@mui/icons-material/CopyAll';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export const Code: React.FC<{ code: CodeObject }> = ({ code }) => {
  const [value, setValue] = useState(0);

  const handleChange = (_event: ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Paper>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
      >
        <Tab label="HTML" {...a11yProps(0)} />
        <Tab label="CSS" {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Highlighter code={code.html} language="htmlbars" parser={html}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Highlighter code={code.css} language="css" />
      </TabPanel>
    </Paper>
  );
};

const Highlighter: React.FC<{
  code: string;
  language: string;
  parser?: any;
}> = ({ code, language, parser }) => {
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    setCopied(true);
  };

  const handleClose = () => {
    setCopied(false);
  };

  if (parser) {
    code = prettier.format(code, {
      arrowParens: 'always',
      bracketSpacing: false,
      embeddedLanguageFormatting: 'auto',
      htmlWhitespaceSensitivity: 'css',
      insertPragma: false,
      jsxSingleQuote: false,
      printWidth: 80,
      proseWrap: 'always',
      quoteProps: 'as-needed',
      requirePragma: false,
      semi: false,
      singleQuote: true,
      tabWidth: 2,
      trailingComma: 'es5',
      useTabs: false,
      vueIndentScriptAndStyle: false,
      plugins: [parser],
      parser: 'html',
    });
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 0,
          m: 0,
          bgcolor: 'background.paper',
        }}
      >
        <CopyToClipboard text={code} onCopy={() => handleClick()}>
          <Tooltip title="Kopiuj kod" placement="top">
            <IconButton>
              <CopyAllIcon />
            </IconButton>
          </Tooltip>
        </CopyToClipboard>
      </Box>
      <SyntaxHighlighter
        customStyle={{ maxHeight: '44vh', margin: 0 }}
        language={language}
        style={vs2015}
      >
        {code}
      </SyntaxHighlighter>
      <Snackbar open={copied} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Kod źródłowy został skopiowany do schowka.
        </Alert>
      </Snackbar>
    </>
  );
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
};
