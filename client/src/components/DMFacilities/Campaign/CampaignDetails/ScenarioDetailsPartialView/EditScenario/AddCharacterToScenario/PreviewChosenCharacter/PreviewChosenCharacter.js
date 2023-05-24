const PreviewChosenCharacter = props => {
    const character = props.character;

    return (
        <div>
            Preview chosen character
            {character.characterName}
        </div>
    )
}

export default PreviewChosenCharacter;
