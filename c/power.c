power(x, n)		/* raise x to nth power */
int x, n;
{
	int p;

	for (p = 1; n > 0; --n)
		p = p * x;
	return(p);
}
