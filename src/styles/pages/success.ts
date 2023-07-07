import { styled } from "..";

export const SuccessContainer = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto',
  height: 656,

  h1: {
    fontSize: '$2xl',
    color: '$gray100',
    marginTop: '3.25rem',
  },

  p: {
    fontSize: '$xl',
    color: '$gray300',
    maxWidth: 560,
    textAlign: 'center',
    marginTop: '2rem',
    lineHeight: 1.4
  },

  a: {
    display: 'block',
    marginTop: '5rem',
    fontSize: '$lg',
    color: '$green500',
    textDecoration: 'none',
    fontWeight: 'bold',

    '&:hover': {
      color: '$green300',
    }
  }
})

export const ImageListContainer = styled('div', {
  display: 'flex',
  alignItems: 'center'
})

export const ImageContainer = styled('div', {
  width: '100%',
  maxWidth: 110,
  height: 110,
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: '50%',
  padding: '4rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '-5px 5px 16px -3px rgba(0,0,0,0.6)',

  img: {
    objectFit: 'cover'
  },

  '&:not(:first-child)': {
    marginLeft: '-3rem',
  }
})
