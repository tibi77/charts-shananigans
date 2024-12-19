type TSelectorProps = {
  roles: string[];
  sources: string[];
  selectedRole: string;
  setSelectedRole: (role: string) => void;
  selectedSource: string;
  setSelectedSource: (source: string) => void;
};
export const DataSelectors = ({
  roles,
  sources,
  selectedRole,
  setSelectedRole,
  selectedSource,
  setSelectedSource,
}: TSelectorProps) => {
  return (
    <div className="flex gap-4">
      <select
        className="p-2 border rounded"
        value={selectedRole}
        onChange={(e) => setSelectedRole(e.target.value)}
      >
        {roles.map((role) => (
          <option key={role} value={role}>
            {role}
          </option>
        ))}
      </select>
      <select
        className="p-2 border rounded"
        value={selectedSource}
        onChange={(e) => setSelectedSource(e.target.value)}
      >
        {sources.map((source) => (
          <option key={source} value={source}>
            {source}
          </option>
        ))}
      </select>
    </div>
  );
};
