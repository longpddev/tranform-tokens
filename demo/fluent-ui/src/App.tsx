import {Button, Checkbox, Field, Slider} from '@fluentui/react-components'
import { DatePicker } from "@fluentui/react-datepicker-compat";
import {ReactNode} from 'react';

function CenterDiv({children}: {children: ReactNode}) {
  return <div style={{display: "flex", "alignItems": "center"}}>{children}</div>
}

function App() {
  return (
    <>
      <CenterDiv>
        <Button appearance='primary'>hello world</Button>
      </CenterDiv>
      <CenterDiv>
        <Slider defaultValue={20} />
      </CenterDiv>
      <CenterDiv>
        <Checkbox checked label='checkbox' />
      </CenterDiv>
      <CenterDiv>
        <Field label="Select a date">
          <DatePicker
            placeholder="Select a date..."
          />
        </Field>
      </CenterDiv>
    </>
  )
}

export default App
