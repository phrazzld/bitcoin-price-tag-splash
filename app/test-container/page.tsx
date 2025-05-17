import Container from "@/components/ui/Container";

export default function TestContainerPage() {
  return (
    <main className="min-h-screen bg-gray-100">
      <div className="py-16">
        <Container>
          <div className="col-span-12 bg-bitcoin-orange text-white p-6 rounded">
            Full Width (12 columns)
          </div>

          <div className="col-span-4 bg-gray-500 text-white p-6 rounded">
            One Third (4 columns)
          </div>
          <div className="col-span-4 bg-gray-700 text-white p-6 rounded">
            One Third (4 columns)
          </div>
          <div className="col-span-4 bg-gray-900 text-white p-6 rounded">
            One Third (4 columns)
          </div>

          <div className="col-span-6 bg-blue-500 text-white p-6 rounded">
            Half Width (6 columns)
          </div>
          <div className="col-span-6 bg-blue-700 text-white p-6 rounded">
            Half Width (6 columns)
          </div>
        </Container>
      </div>
    </main>
  );
}
