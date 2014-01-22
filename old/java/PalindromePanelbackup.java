/* File:    PalindromePanel.java
 * Author:  Mathew Marsh
 * Course:  INFO-I211
 * Date:    January 30, 2012
 * 
 * Purpose: Creates the GUI for PalindromeTest.java
 */

import java.awt.Color;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.BufferedReader;

import javax.swing.JButton;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JTextField;
import com.jgoodies.forms.layout.FormLayout;
import com.jgoodies.forms.layout.ColumnSpec;
import com.jgoodies.forms.factories.FormFactory;
import com.jgoodies.forms.layout.RowSpec;

public class PalindromePanel extends JPanel {

	private JPanel panel;
	private JLabel promptLabel;
	private JTextField inputField, resultField;
	private JButton inputButton, exitButton;
	private String candidateString;
	private int left, right;

	
	public PalindromePanel() {

		// Create label to display instructions to user
		promptLabel = new JLabel("Enter a palindrome candidate: ");

		// Creating buttons and attaching action listeners to them
		ButtonListener buttonListener = new ButtonListener();

		// Add components to JPanel
		panel = new JPanel();
		panel.setBackground(Color.WHITE);
		panel.setLayout(new FormLayout(new ColumnSpec[] {
				FormFactory.LABEL_COMPONENT_GAP_COLSPEC,
				ColumnSpec.decode("225px"),
				FormFactory.LABEL_COMPONENT_GAP_COLSPEC, }, new RowSpec[] {
				FormFactory.LINE_GAP_ROWSPEC, FormFactory.DEFAULT_ROWSPEC,
				FormFactory.LINE_GAP_ROWSPEC, FormFactory.DEFAULT_ROWSPEC,
				FormFactory.LINE_GAP_ROWSPEC, FormFactory.DEFAULT_ROWSPEC,
				FormFactory.LINE_GAP_ROWSPEC, FormFactory.DEFAULT_ROWSPEC,
				FormFactory.LINE_GAP_ROWSPEC, FormFactory.DEFAULT_ROWSPEC, }));
		panel.add(promptLabel, "2, 2, center, center");

		// Add JPanel to JFrame
		add(panel);
		inputButton = new JButton("Test");
		inputButton.addActionListener(buttonListener);

		// Input field for possible palindromes
		inputField = new JTextField(30);
		panel.add(inputField, "2, 4, center, center");
		panel.add(inputButton, "2, 6, center, center");

		// Text field to display result
		resultField = new JTextField(30);
		resultField.setEditable(false);
		panel.add(resultField, "2, 8, left, center");
		exitButton = new JButton("Exit");
		panel.add(exitButton, "2, 10, center, top");
	}

	private class ButtonListener implements ActionListener {

		public void actionPerformed(ActionEvent event) {

			
			
			// Close program, if exit button is triggered
			if (event.getSource() == exitButton) {
				System.exit(0);
			} else {

				// Pull test from input text field
				candidateString = inputField.getText();
				
				resultField.setText();

				// If while statement failed to reach the middle of word
				if (left < right) {
					resultField.setText("Sorry, that is NOT a Palindrome.");
				}
				// Otherwise, it's a palindrome
				else {
					resultField
							.setText("Congratulations, that is a palindrome!");
				}
			}
		}
	}
}
