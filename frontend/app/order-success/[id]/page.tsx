import OrderSuccess from "@/components/order-success"

type PageProps = {
  params: Promise<{
    id: string
  }>
}

export default async function OrderSuccessPage({
  params,
}: PageProps) {
  const { id } = await params

  return <OrderSuccess orderId={id} />
}