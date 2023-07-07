import Link from "next/link"
import { styled } from "..";

export const HomeContainer = styled('main', {
  display: "flex",
  width: '100%',
  maxWidth: 'calc(100vw - ((100vw - 1440px) / 2))',
  marginLeft: 'auto',
  minHeight: 656
})

export const Product = styled(Link, {
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
  padding: '0.25rem',
  cursor: 'pointer',
  position: 'relative',
  overflow: 'hidden',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    objectFit: 'cover'
  },

  footer: {
    position: 'absolute',
    bottom: '0.25rem',
    left: '0.25rem',
    right: '0.25rem',
    borderRadius: 6,
    padding: '2rem',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    backgroundColor: 'rgba(0, 0, 0, 0.6)',

    transform: 'translateY(110%)',
    opacity: '0',
    transition: 'all 0.2s ease-in-out',

    div: {
      display: 'flex',
      flexDirection: 'column',

      strong: {
        fontSize: '$lg',
        color: '$gray100'
      },
  
      span: {
        fontSize: '$xl',
        fontWeight: 'bold',
        color: '$green300',
        marginTop: '0.5rem'
      },
    },

    button: {
      background: '$green500',
      border: 0,
      padding: '0.75rem',
      borderRadius: 6,
      cursor: 'pointer',
  
      svg: {
        color: '$white',
      }
    },
  },

  '&:hover': {
    footer: {
      transform: 'translateY(0)',
      opacity: 1
    }
  }
})
