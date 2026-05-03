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
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
          Reading dates
        </p>
        <h2 className="text-xl font-semibold text-white">
          Track reads and rereads
        </h2>
        <p className="text-sm leading-7 text-slate-400">
          Keep one timeline for the current read, or add extra sessions when you come back for a reread.
        </p>
      </div>

      <div className="mt-5 space-y-4">
        {sessions.map((session, index) => (
          <div
            key={session.id}
            className="rounded-[1.3rem] border border-white/10 bg-slate-950/25 p-4"
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  {index === 0 ? "Primary read" : `Reread ${index}`}
                </p>
                <p className="mt-1 text-sm text-slate-300">
                  Add the dates you started and finished this reading session.
                </p>
              </div>

              {sessions.length > 1 ? (
                <button
                  type="button"
                  onClick={() => removeSession(session.id)}
                  className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400 transition-colors hover:text-white"
                >
                  Remove
                </button>
              ) : null}
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
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
                  className="w-full rounded-[1.1rem] border border-white/10 bg-slate-950/35 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-amber-200/30"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
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
                  className="w-full rounded-[1.1rem] border border-white/10 bg-slate-950/35 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-amber-200/30"
                />
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addSession}
          className="inline-flex h-11 items-center justify-center rounded-full border border-amber-200/20 bg-amber-200/10 px-4 text-sm font-semibold text-amber-100 transition-colors hover:bg-amber-200/15"
        >
          + Add reread
        </button>
      </div>
    </div>
  );
};

export default ReadingDatesForm;
