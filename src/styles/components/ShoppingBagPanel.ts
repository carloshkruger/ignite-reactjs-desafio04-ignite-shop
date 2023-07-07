import * as Dialog from '@radix-ui/react-dialog';
import { keyframes, styled } from "..";

const contentShow = keyframes({
  '100%': {
    right: 0
  }
})

export const HandbagButton = styled('button', {
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
    width: '1.75rem',
    height: '1.75rem',
    textAlign: 'center',
    top: '-0.75rem',
    left: '1.75rem',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.875rem',
    border: '2px solid $gray900'
  },

  variants: {
    hasItems: {
      true: {
        '& > svg': {
          color: '$white',
        }
      }
    }
  }
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

  '& > div': {
    width: '100%',
    height: '100%',
    position: 'relative',

    '& > strong': {
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

export const ItemsContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  marginTop: '2rem',
  height: 'calc(100vh - 9rem - 270px)',
  overflowY: 'auto',

  '& > div': {
    display: 'flex',
    gap: '1.5rem',

    img: {
      borderRadius: 8,
    },

    div: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',

      span: {
        fontSize: '1.125rem',
        color: '$gray300',
        lineHeight: '160%'
      },
  
      strong: {
        fontSize: '1.125rem',
        color: '$gray100',
        lineHeight: '160%'
      },
  
      button: {
        color: '$green500',
        background: 'transparent',
        border: 0,
        fontSize: '1rem',
        fontWeight: 700,
        lineHeight: '160%',
        display: 'flex',
        cursor: 'pointer',
  
        '&:hover': {
          color: '$green300',
        }
      },
    },

    '&:not(:last-child)': {
      marginBottom: '1.5rem'
    }
  }
})

export const QuantityContainer = styled('div', {
  fontSize: '1rem',
  color: '$gray100',
  lineHeight: '160%',
  fontWeight: 400
})

export const TotalText = styled('span', {
  fontSize: '1.125rem',
  color: '$gray100',
  lineHeight: '160%',
  fontWeight: 700
})

export const TotalValue = styled('span', {
  fontSize: '1.5rem',
  color: '$gray100',
  lineHeight: '160%',
  fontWeight: 700
})

export const EmptyBagMessage = styled('span', {
  display: 'block',
  marginTop: '1rem'
})