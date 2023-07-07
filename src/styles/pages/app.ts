import * as Dialog from '@radix-ui/react-dialog';
import { keyframes, styled } from "..";

const contentShow = keyframes({
    '100%': {
      right: 0
    }
})

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  minHeight: '100vh'
})

export const Header = styled('header', {
  padding: '2rem 0',
  width: '100%',
  maxWidth: 1440,
  margin: '0 auto',
  display: "flex",
  alignItems: 'center',
  justifyContent: 'space-between',

  button: {
    background: '$gray800',
    border: 0,
    padding: '0.75rem',
    borderRadius: 6,
    cursor: 'pointer',
    position: 'relative',

    svg: {
      color: '$gray500',
    },

    span: {
      color: '$white',
      position: 'absolute',
      background: '$green500',
      width: '1.5rem',
      height: '1.5rem',
      textAlign: 'center',
      top: '-0.75rem',
      left: '3.75rem',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '0.875rem',
      border: '2px solid $gray900'
    }
  },
})

export const ShoppingBagContainer = styled(Dialog.Content, {
  position: 'fixed',
  height: '100vh',
  background: '$gray800',
  top: 0,
  right: '-30rem',
  width: '100%',
  maxWidth: '30rem',
  padding: '4.5rem 3rem 3rem 3rem',

  display: 'flex',
  flexDirection: 'column',

  animation: `${contentShow} 200ms forwards`,

  '& > button': {
    position: 'absolute',
    color: '$white',
    top: '1.5rem',
    right: '1.5rem',
    background: 'transparent',
    border: 0,
    cursor: 'pointer'
  },

  div: {
    width: '100%',
    height: '100%',
    position: 'relative',

    strong: {
      fontSize: '1.25rem',
      color: '$gray100',
      marginBottom: '2rem'
    },
  
    footer: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
  
      div: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
  
      button: {
        width: '100%',
        padding: '1.25rem 2rem',
        background: '$green500',
        color: '$white',
        border: 0,
        fontSize: '1.125rem',
        fontWeight: 700,
        cursor: 'pointer',
        marginTop: '3.5rem',
  
        '&:disabled': {
          opacity: 0.6,
          cursor: 'default'
        },
  
        '&:not(:disabled):hover': {
          background: '$green300',
        },
      }
    }
  },
})