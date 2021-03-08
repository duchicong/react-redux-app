import React from 'react'
import { ThemeProvider } from '@material-ui/core/styles'
import theme from '../theme'
import PublishLayout from '../layouts/Publish'
import CreateFood from './CreateFood'
import { List as ListFoods } from '../components/Foods'

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <PublishLayout>
          <CreateFood />
          <ListFoods />
        </PublishLayout>
      </ThemeProvider>
    </div>
  );
}

export default App;
