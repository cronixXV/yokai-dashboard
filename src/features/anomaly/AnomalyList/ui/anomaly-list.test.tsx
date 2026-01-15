import { render, screen } from "@testing-library/react";
import { AnomalyList } from "./anomaly-list";
import { Anomaly } from "@/shared/schemes/scheme";

vi.mock("../../AnomalyCard/ui/anomaly-card", () => ({
  AnomalyCard: ({
    anomaly,
    isCapturing,
  }: {
    anomaly: Anomaly;
    isCapturing: boolean;
  }) => (
    <div data-testid="anomaly-card" data-capturing={isCapturing}>
      Mocked Card: {anomaly.name} (capturing: {isCapturing.toString()})
    </div>
  ),
}));

describe("AnomalyList", () => {
  const mockAnomalies: Anomaly[] = [
    {
      id: "1",
      name: "Kitsune",
      threatLevel: "High",
      location: "Shibuya",
      status: "Active",
    },
    {
      id: "2",
      name: "Tengu",
      threatLevel: "Critical",
      location: "Shinjuku",
      status: "Active",
    },
  ];

  it("Отображает пустое состояние при отсутствии аномалий", () => {
    render(
      <AnomalyList anomalies={[]} onCapture={() => {}} capturingId={null} />
    );

    expect(screen.getByText("No yokai detected")).toBeInTheDocument();
    expect(screen.queryByTestId("anomaly-card")).not.toBeInTheDocument();
  });

  it("Отображает список карточек аномалий", () => {
    render(
      <AnomalyList
        anomalies={mockAnomalies}
        onCapture={() => {}}
        capturingId={null}
      />
    );

    const cards = screen.getAllByTestId("anomaly-card");
    expect(cards).toHaveLength(2);
    expect(cards[0]).toHaveTextContent("Kitsune");
    expect(cards[1]).toHaveTextContent("Tengu");
  });

  it("Корректно передает свойство isCapturing в AnomalyCard", () => {
    render(
      <AnomalyList
        anomalies={mockAnomalies}
        onCapture={() => {}}
        capturingId="1"
      />
    );

    const cards = screen.getAllByTestId("anomaly-card");
    expect(cards[0]).toHaveAttribute("data-capturing", "true");
    expect(cards[1]).toHaveAttribute("data-capturing", "false");
  });
});
