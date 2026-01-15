import { render, screen } from "@testing-library/react";
import { AppNotification } from "./app-notification";
import { vi } from "vitest";

// Мокаем таймеры для предсказуемости
beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

describe("AppNotification", () => {
  it("Отображает сообщение корректно", () => {
    const mockOnClose = vi.fn();
    render(<AppNotification message="Test error" onClose={mockOnClose} />);

    expect(screen.getByText("Test error")).toBeInTheDocument();
  });

  it("Вызывает onClose через 3 секунды", async () => {
    const mockOnClose = vi.fn();
    render(<AppNotification message="Test error" onClose={mockOnClose} />);

    vi.advanceTimersByTime(3000);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("Очищает таймер при отмонтировании.", () => {
    const mockOnClose = vi.fn();
    const { unmount } = render(
      <AppNotification message="Test error" onClose={mockOnClose} />
    );

    vi.advanceTimersByTime(1000);

    unmount();

    vi.advanceTimersByTime(2000);

    expect(mockOnClose).not.toHaveBeenCalled();
  });
});
