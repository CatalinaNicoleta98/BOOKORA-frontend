import type { ReadingSession } from "../types/library.types";

interface ReadingDatesFormProps {
  readingSessions: ReadingSession[];
  onChange: (sessions: ReadingSession[]) => void;
}

const toDateInputValue = (value?: string) => {
  if (!value) return "";
  return value.slice(0, 10);
};

const toOptionalDate = (value: string) => {
  return value ? value : undefined;
};

const createSession = (index: number): ReadingSession => ({
  id: `session-${Date.now()}-${index}`,
  dateStarted: undefined,
  dateFinished: undefined
});

export const ReadingDatesForm = ({
  readingSessions,
  onChange
}: ReadingDatesFormProps) => {
  const sessions = readingSessions.length > 0 ? readingSessions : [createSession(0)];

  const updateSession = (
    sessionId: string,
    field: "dateStarted" | "dateFinished",
    value?: string
  ) => {
    onChange(
      sessions.map((session) =>
        session.id === sessionId
          ? {
              ...session,
              [field]: value
            }
          : session
      )
    );
  };

  const addSession = () => {
    onChange([...sessions, createSession(sessions.length)]);
  };

  const removeSession = (sessionId: string) => {
    const nextSessions = sessions.filter((session) => session.id !== sessionId);
    onChange(nextSessions.length > 0 ? nextSessions : [createSession(0)]);
  };

  return (
    <div>
      <div className="space-y-2">
        <p className="theme-text-muted text-xs font-semibold uppercase tracking-[0.18em]">
          Reading dates
        </p>
        <h2 className="theme-title text-xl font-semibold">
          Track reads and rereads
        </h2>
        <p className="theme-text-muted text-sm leading-7">
          Keep one timeline for the current read, or add extra sessions when you come back for a reread.
        </p>
      </div>

      <div className="mt-5 space-y-4">
        {sessions.map((session, index) => (
          <div
            key={session.id}
            className="theme-content-panel-soft rounded-[1.3rem] p-4"
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="theme-text-muted text-xs font-semibold uppercase tracking-[0.16em]">
                  {index === 0 ? "Primary read" : `Reread ${index}`}
                </p>
                <p className="theme-text-soft mt-1 text-sm">
                  Add the dates you started and finished this reading session.
                </p>
              </div>

              {sessions.length > 1 ? (
                <button
                  type="button"
                  onClick={() => removeSession(session.id)}
                  className="theme-text-muted text-xs font-semibold uppercase tracking-[0.14em] transition-colors hover:text-[var(--bookora-title)]"
                >
                  Remove
                </button>
              ) : null}
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="theme-text-muted mb-2 block text-xs font-semibold uppercase tracking-[0.16em]">
                  Date started
                </label>
                <input
                  type="date"
                  value={toDateInputValue(session.dateStarted)}
                  onChange={(event) =>
                    updateSession(
                      session.id,
                      "dateStarted",
                      toOptionalDate(event.target.value)
                    )
                  }
                  className="theme-input w-full rounded-[1.1rem] px-4 py-3 text-sm"
                />
              </div>

              <div>
                <label className="theme-text-muted mb-2 block text-xs font-semibold uppercase tracking-[0.16em]">
                  Date finished
                </label>
                <input
                  type="date"
                  value={toDateInputValue(session.dateFinished)}
                  onChange={(event) =>
                    updateSession(
                      session.id,
                      "dateFinished",
                      toOptionalDate(event.target.value)
                    )
                  }
                  className="theme-input w-full rounded-[1.1rem] px-4 py-3 text-sm"
                />
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addSession}
          className="theme-button-accent inline-flex h-11 items-center justify-center rounded-full px-4 text-sm font-semibold"
        >
          + Add reread
        </button>
      </div>
    </div>
  );
};

export default ReadingDatesForm;
