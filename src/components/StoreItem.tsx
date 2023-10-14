import { Button, Card } from "react-bootstrap";
import { formatCurrency } from "../utilities/formatCurrency";
import { useShoppingCart } from "../context/shoppingCartContext";

// Define expected props for the component
type StoreItemProps = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
};

// StoreItem component receives props as arguments which are imported at the Store.tsx from data
export function StoreItem({ id, name, price, imgUrl }: 
StoreItemProps) {
  const { 
    getItemQuantity, 
    increaseCartQuantity, 
    decreaseCartQuantity, 
    removeFromCart
  } = useShoppingCart()
  const quantity = getItemQuantity(id)
  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={imgUrl} // Display the item's image
        height="250px"
        style={{ objectFit: "cover" }} // Style the image
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-2">{name}</span> {/* Item name */}
          <span className="ms-2 text-muted">{formatCurrency(price)}</span> {/* Item price */}
        </Card.Title>
        <div className="mt-auto">
          {quantity === 0 ? (
          <Button className="w-100" onClick={() => increaseCartQuantity(id)}>+ Add To Cart</Button>
          ) : (
          <div className="d-flex align-items-center flex-column" style={{ gap: ".5rem"}}>
            <div className="d-flex align-items-center justify-content-center" style={{ gap: ".5rem"}}>
            <Button onClick={() => decreaseCartQuantity(id)}>-</Button>
            <div><span className="fs-3"> {quantity}</span> in cart</div>
            <Button onClick={() => increaseCartQuantity(id)}>+</Button>
            </div>
            <Button onClick={() => removeFromCart(id)} variant="danger" size="sm">Remove</Button>
            </div>
            )}
        </div>
      </Card.Body>
    </Card>
  );
}