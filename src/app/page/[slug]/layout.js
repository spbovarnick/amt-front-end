import IndexPage from "@/app/components/IndexPage";

export default function PageLayout({ children, params }) {
  return (
    <>
      <IndexPage />
      {children}
    </>
  );
}