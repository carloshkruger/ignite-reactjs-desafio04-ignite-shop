import { globalCss } from ".";

export const globalStyles = globalCss({
  '*': {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box'
  },

  body: {
    '-webkit-font-smoothing': 'antialiased',
    backgroundColor: '$gray900',
    color: '$gray100'
  },

  'body, input, textarea, button': {
    fontFamily: 'Roboto',
    fontWeight: 400
  },

  '::-webkit-scrollbar': {
    width: '10px'
  },
  '::-webkit-scrollbar-track': {
    background: '$gray100',
  },
  '::-webkit-scrollbar-thumb': {
    background: '$gray300',
    borderRadius: 6
  },
  '::-webkit-scrollbar-thumb:hover': {
    background: '$gray500' 
  }
})