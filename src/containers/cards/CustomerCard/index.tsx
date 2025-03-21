import { type FC, type MouseEvent } from "react";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { addDoc, deleteDoc, QueryDocumentSnapshot } from "firebase/firestore";
import {
  Card,
  CardActionArea,
  CardActionAreaProps,
  CardContent,
  Divider,
  Stack,
  Typography,
  type CardProps,
} from "@mui/material";
import MenuIconButton from "@/components/buttons/MenuIconButton";
import type { CustomerData, MenuOption } from "@/types/global";
import { ContentCopy, Delete, Edit } from "@mui/icons-material";

interface CustomerCard extends Omit<CardProps, "onClick"> {
  customer: QueryDocumentSnapshot<CustomerData>;
  onClick?: (
    event: MouseEvent<HTMLButtonElement>,
    customer: QueryDocumentSnapshot<CustomerData>
  ) => void;
  options?: MenuOption[];
}

/**
 * This component renders a card with customer information.
 * @param customer - The customer document snapshot.
 * @param options - The options to display in the card menu.
 * @param onClick - The function to call when the card is clicked.
 */
const CustomerCard: FC<CustomerCard> = ({
  customer,
  options: optionsProp,
  onClick: onClickProp,
  ...props
}) => {
  /** Values */

  const { name, phone, email, address } = customer.data();

  const router = useRouter();
  const navigate = useNavigate();

  const options = optionsProp ?? [
    {
      id: "edit",
      label: "Edit",
      icon: <Edit />,
      onClick: () => navigate({ to: `/customers/${customer.id}` }),
    },
    {
      id: "duplicate",
      label: "Duplicate",
      icon: <ContentCopy />,
      onClick: async () => {
        try {
          const { name, phone, email, address } = customer.data();
          await addDoc(customer.ref.parent, {
            name: `${name} (Copy)`,
            email,
            phone,
            address,
          });
          router.invalidate();
        } catch (error) {
          console.error("Error duplicating customer:", error);
        }
      },
    },
    {
      id: "delete",
      label: "Delete",
      icon: <Delete />,
      onClick: async () => {
        try {
          await deleteDoc(customer.ref);
          router.invalidate();
        } catch (error) {
          console.error("Error deleting customer:", error);
        }
      },
    },
  ];

  /** Callbacks */

  const onClick: CardActionAreaProps["onClick"] = (event) => {
    if (onClickProp) onClickProp(event, customer);
    else navigate({ to: `/customers/${customer.id}` });
  };

  return (
    <Card variant="outlined" {...props}>
      <CardActionArea onClick={onClick}>
        <CardContent
          component={Stack}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack spacing={1}>
            <Typography variant="body2" fontWeight="bold">
              {name}
            </Typography>
            <Stack
              direction="row"
              spacing={1}
              divider={<Divider orientation="vertical" flexItem />}
              alignItems="center"
            >
              <Typography variant="subtitle2">Phone: {phone}</Typography>
              <Typography variant="subtitle2">Email: {email}</Typography>
              <Typography variant="subtitle2">Address: {address}</Typography>
            </Stack>
          </Stack>

          {Boolean(options.length) && <MenuIconButton options={options} />}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CustomerCard;
