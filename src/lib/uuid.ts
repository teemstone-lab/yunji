export const uuid = () => {
	return String(self.crypto.randomUUID());
};
