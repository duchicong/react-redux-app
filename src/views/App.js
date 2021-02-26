import React from 'react'
import { ThemeProvider } from '@material-ui/core/styles'
import theme from '../theme'
import PublishLayout from '../layouts/Publish'
import CreateFood from './CreateFood'

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <PublishLayout>
          <CreateFood />
        </PublishLayout>
      </ThemeProvider>
    </div>
  );
}

export default App;
