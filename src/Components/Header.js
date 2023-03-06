import React from 'react'
import { useStateValue } from '../State/StateProvider';

function Header() {
    const [{user}] = useStateValue();
  return (
    <div>Header</div>
  )
}

export default Header