/* File:    PalindromeTest.java
 * Author:  Mathew Marsh
 * Date:    January 30, 2012
 * 
 * Purpose: Test whether a user inputed string is a palindrome.
 */

import javax.swing.JFrame;

public class PalindromeTest {
	
	public static void main(String[] args) {
				
		// Create a JFrame for PalindromePanel to go into
		JFrame frame = new JFrame("Palindrome Tester");
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
				
		// Insert PalindromePanel to JFrame
		frame.getContentPane().add(new PalindromePanel());
		frame.pack();
		frame.setVisible(true);
		
	}	
}


