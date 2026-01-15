import { render, screen, fireEvent } from "@testing-library/react";
import { AnomalyCard } from "./anomaly-card";

describe("AnomalyCard", () => {
  const mockAnomaly = {
    id: "1",
    name: "Kitsune",
    threatLevel: "High" as const,
    location: "Shibuya",
    status: "Active" as const,
  };

  it("Корректно отображает информацию об аномалии", () => {
    render(
      <AnomalyCard
        anomaly={mockAnomaly}
        onCapture={() => {}}
        isCapturing={false}
      />
    );

    expect(screen.getByText("Kitsune")).toBeInTheDocument();
    expect(screen.getByText("📍 Shibuya")).toBeInTheDocument();
    expect(screen.getByText("High")).toBeInTheDocument();
    expect(screen.getByText("Active")).toBeInTheDocument();
  });

  it("Отображает кнопку «Захват» для активных аномалий", () => {
    render(
      <AnomalyCard
        anomaly={mockAnomaly}
        onCapture={() => {}}
        isCapturing={false}
      />
    );

    const button = screen.getByRole("button", { name: /capture/i });
    expect(button).toBeInTheDocument();
    expect(button).toBeEnabled();
  });

  it("Отключает кнопку при захвате изображения", () => {
    render(
      <AnomalyCard
        anomaly={mockAnomaly}
        onCapture={() => {}}
        isCapturing={false}
      />
    );

    const button = screen.getByRole("button", { name: "Capture" });
    expect(button).toBeInTheDocument();
    expect(button).toBeEnabled();
  });

  it("Вызывает метод onCapture при нажатии", () => {
    const handleCapture = vi.fn();
    render(
      <AnomalyCard
        anomaly={mockAnomaly}
        onCapture={handleCapture}
        isCapturing={false}
      />
    );

    const button = screen.getByRole("button", { name: /capture/i });
    fireEvent.click(button);

    expect(handleCapture).toHaveBeenCalledWith("1");
  });

  it("Кнопка «Захват» не отображается для захваченных аномалий", () => {
    const capturedAnomaly = { ...mockAnomaly, status: "Captured" as const };
    render(
      <AnomalyCard
        anomaly={capturedAnomaly}
        onCapture={() => {}}
        isCapturing={false}
      />
    );

    expect(
      screen.queryByRole("button", { name: /capture/i })
    ).not.toBeInTheDocument();
  });
});
