export default (password: string) : boolean => {
	const re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
	return re.test(password);
};
