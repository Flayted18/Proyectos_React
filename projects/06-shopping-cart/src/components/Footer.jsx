import "./Footer.css"

export const Footer = ({filters}) => {
  return (
    <footer className="footer">
        {
            JSON.stringify(filters, null, 2)
        }

        {/* <h4>Prueba Tecnica de React</h4>
        <span>@Santiago</span>
        <h5>Shopping cart con </h5> */}
    </footer>
  )
}
